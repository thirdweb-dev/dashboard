import { Link } from "tw-components";

export const MumbaiFAQ = [
  {
    question: "What is the Polygon Faucet?",
    answer:
      "A Polygon faucet is a tool for developers to get free Mumbai Testnet Polygon (MATIC) tokens to test their applications before deploying them to mainnet. The thirdweb Polygon faucet is free, fast, and does not require authentication or login.",
  },
  {
    question: "What are Polygon Mumbai Testnet tokens?",
    answer:
      "Polygon Mumbai Testnet is a test network where developers can test out their applications before deploying them to mainnet. Mumbai Testnet transactions use test matic tokens, so that developers do not need to spend money to test their applications.",
  },
  {
    question: "How do I use the Polygon Faucet?",
    answer:
      "To request free Polygon Mumbai Testnet funds, simply enter the wallet address you want to receive the tokens at, and click on “Request funds.” You’ll get a confirmation that your funds have sent successfully, and will be able to see them in your wallet shortly! You will receive 1 free matic Mumbai Testnet token every time you request funds.",
  },
  {
    question:
      "Is the Polygon Mumbai Testnet the same as the Polygon testnet? What’s the difference between Polygon Mumbai Testnet and testnet tokens?",
    answer:
      "The Polygon Mumbai Testnet is not the same as the Polygon testnet. It is recommended for developers to use the Polygon Mumbai Testnet. The testnet is used by Polygon labs to test upgrades to the network, while Mumbai Testnet is a copy of mainnet execution environment. This faucet provides Mumbai Testnet funds.",
  },
  {
    question: "How long will it take to get my Mumbai Testnet tokens?",
    answer:
      "You should receive your Polygon Mumbai Testnet tokens immediately. Please click the “View on polygonscan link and see if your transaction has been confirmed.",
  },
  {
    question:
      "What if I still can’t get funds, run into any issues, or have questions?",
    answer: (
      <>
        Please try again in a few minutes. If the issue persists, please reach
        out to us on our{" "}
        <Link href="https://discord.gg/thirdweb" textDecor="underline">
          Discord{" "}
        </Link>
        or{" "}
        <Link href="https://twitter.com/thirdweb" textDecor="underline">
          Twitter
        </Link>
        .
      </>
    ),
  },
];
