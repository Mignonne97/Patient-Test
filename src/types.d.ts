import type { Database } from 'sqlite';

declare global {
  namespace App {
    interface Locals {
      db?: Database;
    }
  }
}