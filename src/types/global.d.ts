import { type Cardano } from "lucid-cardano";

declare global {
  interface Window {
    cardano?: Cardano;
  }
}
