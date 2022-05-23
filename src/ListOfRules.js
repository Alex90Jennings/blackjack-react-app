function ListOfRules() {
  return (
    <ul className="dashed-border-blue list-reset">
      <li className="dashed-border-pink">
        It's you versus the casino of Boolean
      </li>
      <li className="dashed-border-pink">
        The goal of blackjack is to beat the dealer's hand without going over
        21.
      </li>
      <li className="dashed-border-pink">
        Face cards are worth 10. Aces are worth 1 or 11, whichever makes a
        better hand.
      </li>
      <li className="dashed-border-pink">
        Each player starts with two cards, one of the dealer's cards is hidden
        until the end.
      </li>
      <li className="dashed-border-pink">
        To 'Hit' is to ask for another card. To 'Stand' is to hold your total
        and end your turn.
      </li>
      <li className="dashed-border-pink">
        If you go over 21 you bust, and the dealer wins regardless of the
        dealer's hand.
      </li>
      <li className="dashed-border-pink">
        If you are dealt 21 from the start (Ace & 10), you got a blackjack.
      </li>
    </ul>
  );
}

export default ListOfRules;
