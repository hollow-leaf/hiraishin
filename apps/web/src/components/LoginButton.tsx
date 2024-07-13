"use client";

import { ADAPTER_EVENTS, CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { decodeToken, Web3Auth } from "@web3auth/single-factor-auth";
// Firebase libraries for custom authentication
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const verifier = "w3a-firebase-demo";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0nd9YsPLu-tpdCrsXn8wgsWVAiYEpQ_E",
  authDomain: "web3auth-oauth-logins.firebaseapp.com",
  projectId: "web3auth-oauth-logins",
  storageBucket: "web3auth-oauth-logins.appspot.com",
  messagingSenderId: "461819774167",
  appId: "1:461819774167:web:e74addfb6cc88f3b5b9c92",
};

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Firebase Initialisation
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth initialised yet");
      return;
    }
    // login with firebase
    const loginRes = await signInWithGoogle();
    // get the id token from firebase
    const idToken = await loginRes.user.getIdToken(true);
    const { payload } = decodeToken(idToken);

    const web3authProvider = await web3auth.connect({
      verifier,
      verifierId: (payload as any).sub,
      idToken,
    });

    if (web3authProvider) {
      setLoggedIn(true);
      setProvider(web3authProvider);
    }
  };

//   const getUserInfo = async () => {
//     const user = await web3auth.getUserInfo();
//     uiConsole(user);
//   };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

//   const getAccounts = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const web3 = new Web3(provider as any);

//     // Get user's Ethereum public address
//     const address = await web3.eth.getAccounts();
//     uiConsole(address);
//   };

//   const getBalance = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const web3 = new Web3(provider as any);

//     // Get user's Ethereum public address
//     const address = (await web3.eth.getAccounts())[0];

//     // Get user's balance in ether
//     const balance = web3.utils.fromWei(
//       await web3.eth.getBalance(address), // Balance is in wei
//       "ether"
//     );
//     uiConsole(balance);
//   };

//   const signMessage = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const web3 = new Web3(provider as any);

//     // Get user's Ethereum public address
//     const fromAddress = (await web3.eth.getAccounts())[0];

//     const originalMessage = "YOUR_MESSAGE";

//     // Sign the message
//     const signedMessage = await web3.eth.personal.sign(
//       originalMessage,
//       fromAddress,
//       "test password!" // configure your own password here.
//     );
//     uiConsole(signedMessage);
//   };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const loggedInView = (
    <>
    <Link href="/main">
      <button className="w-full p-3 text-white mt-10 bg-yellow-500 rounded-xl">
        Get Started
      </button>
    </Link>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="w-full p-3 text-white mt-10 bg-yellow-500 rounded-xl">
      Sign in
    </button>
    
  );

  return (
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
  );
}

export default App;