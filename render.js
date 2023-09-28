function createVirtualNode(realDOM) {
  if (!realDOM) {
    return null; // Return null if the real DOM element is not provided.
  }

  const virtualNode = {
    tag: realDOM.tagName.toLowerCase(),
    attributes: {},
    style: {},
    childNodes: [],
    parent: null,
    text: '',
    id: realDOM.id,
    class: [],
    siblings: []
  };

  // Extract attributes
  for (const attr of realDOM.attributes) {
    virtualNode.attributes[attr.name] = attr.value;
  }

  // Extract style properties
  const computedStyle = window.getComputedStyle(realDOM);
  for (const prop of computedStyle) {
    virtualNode.style[prop] = computedStyle.getPropertyValue(prop);
  }

  // Extract child nodes (recursively)
  for (const child of realDOM.childNodes) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const childVirtualNode = createVirtualNode(child);
      if (childVirtualNode) {
        childVirtualNode.parent = virtualNode;
        virtualNode.childNodes.push(childVirtualNode);
      }
    } else if (child.nodeType === Node.TEXT_NODE) {
      virtualNode.text = child.textContent.trim();
    }
  }

  // Extract classes
  if (virtualNode.attributes.class) {
    virtualNode.class = virtualNode.attributes.class.split(' ');
    delete virtualNode.attributes.class;
  }

  // Extract siblings
  if (virtualNode.parent) {
    virtualNode.siblings = Array.from(virtualNode.parent.childNodes).filter(node => node !== virtualNode);
  }

  return virtualNode;
}

function createRealNode(virtualNode) {
  if (!virtualNode) {
    return null; // Return null if the virtual node is not provided.
  }

  const realDOM = document.createElement(virtualNode.tag);

  // Set attributes
  for (const attrName in virtualNode.attributes) {
    realDOM.setAttribute(attrName, virtualNode.attributes[attrName]);
  }

  // Set style properties
  for (const propName in virtualNode.style) {
    realDOM.style[propName] = virtualNode.style[propName];
  }

  // Set text content
  if (virtualNode.text) {
    realDOM.textContent = virtualNode.text;
  }

  // Recursively create and append child nodes
  for (const childVirtualNode of virtualNode.childNodes) {
    const childRealNode = createRealNode(childVirtualNode);
    if (childRealNode) {
      realDOM.appendChild(childRealNode);
    }
  }

  // Set ID
  if (virtualNode.id) {
    realDOM.id = virtualNode.id;
  }

  // Set classes
  if (virtualNode.class.length > 0) {
    realDOM.className = virtualNode.class.join(' ');
  }

  return realDOM;
}


class MainComponent {
  constructor() {
    this.root = document.querySelector("#MainContent");
  }

  // Render method to add new content to the DOM
  render($newElement) {
    if (this.root && $newElement) {
      this.root.appendChild($newElement);
    }
  }

  // Update method to replace existing content with new content
  update($oldElement, $newElement) {
    if ($oldElement && $newElement && $oldElement.parentNode) {
      $oldElement.parentNode.replaceChild($newElement, $oldElement);
    }
  }
}

 
