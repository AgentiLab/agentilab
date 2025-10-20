import bcrypt from "bcryptjs";

// Admin credentials - in a real app, this would be in a database
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("25091991", 10);

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function isAuthenticated(req: any): boolean {
  return req.session?.isAdmin === true;
}

export function requireAuth(req: any, res: any, next: any) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
