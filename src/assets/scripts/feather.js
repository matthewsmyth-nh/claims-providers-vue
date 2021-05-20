function isClickEquivalentKey(inputEl, event) {
    switch (true) {
      case inputEl.nodeName === "BUTTON":
        return event.key === " " || event.key === "Enter";
      default:
        // NOTE: "enter" does NOT toggle native checkboxes and radio buttons
        // ARIA spec confirms this (https://w3c.github.io/aria-practices/#checkbox)
        return event.key === " ";
    }
  }
  
  function applyRippleBehavior(el, options = {}) {
    const parentEl = el.parentNode;
    const { boundsEl = parentEl, center = false, inputEl = parentEl, triggerEl = parentEl } = options;
  
    el.dataset.state = "initial";
  
    let timeout = null;
    let grown = false;
    let released = false;
  
    function handlePress(event) {
      const { clientWidth, clientHeight } = boundsEl;
      const maxDimension = Math.round(Math.max(clientWidth, clientHeight));
  
      switch (true) {
        case center:
          Object.assign(el.style, {
            top: `${clientHeight / 2 - maxDimension / 2}px`,
            left: `${clientWidth / 2 - maxDimension / 2}px`,
            height: `${maxDimension}px`,
            width: `${maxDimension}px`,
          });
          break;
        case event.type.startsWith("mouse"):
          const { pageX, pageY } = event;
          const rect = boundsEl.getBoundingClientRect();
          const { scrollTop, scrollLeft } = document.documentElement;
          Object.assign(el.style, {
            top: `${pageY - rect.top - maxDimension - scrollTop}px`,
            left: `${pageX - rect.left - maxDimension - scrollLeft}px`,
            height: `${maxDimension * 2}px`,
            width: `${maxDimension * 2}px`,
          });
          break;
        default:
          Object.assign(el.style, {
            top: `${clientHeight / 2 - maxDimension}px`,
            left: `${clientWidth / 2 - maxDimension}px`,
            height: `${maxDimension * 2}px`,
            width: `${maxDimension * 2}px`,
          });
          break;
      }
  
      el.dataset.state = "initial";
      requestAnimationFrame(() => {
        el.dataset.state = "growing";
      });
  
      grown = false;
      released = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        grown = true;
        if (released) {
          el.dataset.state = "fading";
        }
      }, 380);
    }
  
    function handleRelease(event) {
      released = true;
      if (grown) {
        el.dataset.state = "fading";
      }
    }
  
    function handleAbandon(event) {
      el.dataset.state = "initial";
    }
  
    // ---
  
    let pressInputSource = null;
  
    function handleMouseDown(event) {
      if (!inputEl.disabled && !pressInputSource) {
        pressInputSource = "mouse";
        handlePress(event);
  
        if (document.activeElement !== inputEl) {
          inputEl.focus();
        }
        if (triggerEl !== inputEl) {
          event.preventDefault();
        }
      }
    }
  
    function handleMouseUp(event) {
      if (pressInputSource === "mouse") {
        handleRelease(event);
        pressInputSource = null;
      }
    }
  
    function handleMouseLeave(event) {
      if (pressInputSource === "mouse") {
        handleAbandon(event);
        pressInputSource = null;
      }
    }
  
    function handleKeyDown(event) {
      if (!inputEl.disabled && !pressInputSource && isClickEquivalentKey(inputEl, event)) {
        pressInputSource = "key";
        handlePress(event);
      }
    }
  
    function handleKeyUp(event) {
      if (pressInputSource === "key") {
        handleRelease(event);
        pressInputSource = null;
      }
    }
  
    triggerEl.addEventListener("mousedown", handleMouseDown);
    triggerEl.addEventListener("mouseup", handleMouseUp);
    triggerEl.addEventListener("mouseleave", handleMouseLeave);
    triggerEl.addEventListener("keydown", handleKeyDown);
    triggerEl.addEventListener("keyup", handleKeyUp);
  
    return () => {
      triggerEl.removeEventListener("mousedown", handleMouseDown);
      triggerEl.removeEventListener("mouseup", handleMouseUp);
      triggerEl.removeEventListener("mouseleave", handleMouseLeave);
      triggerEl.removeEventListener("keydown", handleKeyDown);
      triggerEl.removeEventListener("keyup", handleKeyUp);
    };
  }