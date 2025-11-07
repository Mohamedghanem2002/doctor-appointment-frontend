import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);

        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          setTimeout(scrollToHash, 300);
        }
      }
    };

    scrollToHash();
  }, [location]);

  return null;
}

export default ScrollToSection;
