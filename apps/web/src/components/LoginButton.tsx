"use client";
import Link from "next/link";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import Web3 from "web3";

// Web3Auth configuration
const clientId = "BMKrCReEsPSEDFNdtN3yAy44aYxmVBdrwUSioA8Gslovqs3kkdw0b_0P5H2mlsDMZlgj85WS6pAfHL60Citlicc"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x2382", // Inco Gentry Testnet chain ID
  rpcTarget: "https://testnet.inco.org",
  displayName: "Inco Gentry Testnet",
  blockExplorerUrl: "https://explorer.testnet.inco.org/",
  ticker: "INCO",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

// const openloginAdapter = new OpenloginAdapter();
// web3auth.configureAdapter(openloginAdapter);
// Add openlogin adapter for customisations
const openloginAdapterInstance = new OpenloginAdapter({
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT,
    whiteLabel: {
      appName: "Hiraishin",
      logoLight: "/hiraishin.png",
      logoDark: "/hiraishin.png",
      defaultLanguage: "en",
      mode: "light", // whether to enable dark mode. defaultValue: false
    },
  },
});
web3auth.configureAdapter(openloginAdapterInstance);

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          const user = await web3auth.getUserInfo();
          setUserInfo(user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    uiConsole("logged out");
  };

  const login = async () => {
    console.log("login");
    try {
      const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
      setProvider(web3authProvider);
      if (web3auth.connected) {
        const user = await web3auth.getUserInfo();
        setUserInfo(user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
      <Link href="/profile">
        <button className="p-3 text-white mt-10 bg-yellow-500 rounded-xl">
          Get Started
        </button>
      </Link>
  );

  const unloggedInView = (
    <button onClick={login} className="p-3 text-white mt-10 bg-yellow-500 rounded-xl">
      Login
    </button>
  );

  return (
    <div>
      <div className="flex text-center justify-center">
        {userInfo ? loggedInView : unloggedInView}
      </div>
    </div>
  );
}

export default App;
