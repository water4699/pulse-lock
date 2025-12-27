import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
}

export const useWallet = () => {
  const { toast } = useToast();
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
  });

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) return;

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnecting: false,
          isConnected: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      
      if (!ethereum) {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask or another Web3 wallet.",
          variant: "destructive",
        });
        return;
      }

      setWallet(prev => ({ ...prev, isConnecting: true }));

      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      setWallet({
        address: accounts[0],
        isConnecting: false,
        isConnected: true,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnecting: false,
      isConnected: false,
    });
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
  };
};
