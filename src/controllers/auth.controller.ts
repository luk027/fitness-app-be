import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
    res.status(201).json({ message: "User signed up successfully" });
}
export async function login(req: Request, res: Response) {
    res.status(200).json({ message: "User logged in successfully" });
}

export async function googleLogin(req: Request, res: Response) {
    res.status(200).json({ message: "User logged in with Google successfully" });
}

export async function logout(req: Request, res: Response) {
    res.status(200).json({ message: "User logged out successfully" });
}