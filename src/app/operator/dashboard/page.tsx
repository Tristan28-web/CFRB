import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OperatorDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Operator Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to the operator control panel.
        </p>
        <Button asChild className="mt-8">
            <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}
