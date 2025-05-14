export default function ({ children, index = 0, id, current = 0, style = {} }) {
    function getCardClass(cardIndex) {
      if (cardIndex < current) return "before";
      if (cardIndex > current) return "after";
      if (cardIndex === current) return "current";
    }
    return <div id={"parallax-card_" + id} className={`parallax-card ${getCardClass(index)}`} style={style}>{children}</div>
}