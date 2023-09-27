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

 
