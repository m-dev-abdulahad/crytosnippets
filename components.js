class VerticalLayout extends MainComponent {
  constructor() {
    super(); // Call the constructor of the parent class.

    // Create a container virtual node for the vertical layout.
    this.virtualLayout = {
      tag: 'div', // Assuming a <div> container for the layout.
      attributes: {
        class: 'vertical-layout', // You can add a CSS class for styling.
      },
      childNodes: [],
    };

    // Convert the virtual layout to a real DOM element.
    this.$verticalLayout = createRealNode(this.virtualLayout);
  }

  // Method to add a virtual child node to the vertical layout.
  addChild(virtualChildNode) {
    if (virtualChildNode) {
      this.virtualLayout.childNodes.push(virtualChildNode);

      // Update the real DOM element when a child is added.
      this.update(this.$verticalLayout, createRealNode(this.virtualLayout));
    }
  }

  // Method to clear all virtual child nodes from the vertical layout.
  clear() {
    this.virtualLayout.childNodes = [];

    // Clear the real DOM element when all children are removed.
    this.update(this.$verticalLayout, createRealNode(this.virtualLayout));
  }
}
