import { SessionData } from "express-session";
import express from "express";

declare module "express" {
  export interface Request {
    userId?: string; // Добавляем свойство userId в объект Request
  }
}
