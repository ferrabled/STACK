/// <reference types="react-scripts" />
declare module "@metamask/jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement;
}

interface Window {
  ethereum: ethers.providers.ExternalProvider;
  localStorage: Storage;
  location: Location;
}