import "../style/dottedscroller.css";

export default function DottedScroller({ current, onChange, tabs = [] }) {
  return (
    <div className="dotted-scroller">
      <ul>
        {tabs.map((tab, i) => (
          <li key={i}>
            <a
              onClick={() => onChange(i)}
              className={`sect-dot${i === current ? " active" : ""}`}
            >
              <span
                className={`${
                  (current === 3 || current === 6) && i !== current
                    ? "inactive-dot-white"  // Apply white with 50% opacity for non-selected dots
                    : ""
                } ${
                  (current === 3 || current === 6) && i === current
                    ? "active-dot"
                    : ""
                }`}
              />
              <div
                className={`dot-label${
                  current === 3 || current === 6 ? " active-text" : ""
                }`}
              >
                {tab}
              </div> 
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
