import { createContext, useState } from 'react';

export const StateContext = createContext({bet: 0});



// const State = (props) => {
    // const [dealerHand, setDealerHand] = useState([]);
    // const [playerHand, setPlayerHand] = useState([]);
    // const [cardDeck, setCardDeck] = useState([]);
    // const [AIState, setAIState] = useState("waiting");
    // const [result, setResult] = useState(null);
    // const [gameState, setGameState] = useState(null);
    // const [wallet, setWallet] = useState(1000);
    // const [bet, setBet] = useState(250);

    // return (
    //     <State.Provider value={{
            // dealerHand: dealerHand,
            // setDealerHand: setDealerHand,
            // playerHand: playerHand,
            // setPlayerHand: setPlayerHand,
            // cardDeck: cardDeck,
            // setCardDeck: setCardDeck,
            // AIState: AIState,
            // setAIState: setAIState,
            // result: result,
            // setResult: setResult,
            // gameState: gameState,
            // setGameState: setGameState,
            // wallet: wallet,
            // setWallet: setWallet,
        //     bet: bet,
        //     setBet: setBet
        // }}>
        //     {props.children}
        // </State.Provider>
// );
// };

export default StateContext;