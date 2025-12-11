import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side password check (Not secure for high-stakes, but sufficient for this use case)
    // In a real app, this should be validated against a backend or environment variable
    if (password === 'willwi2025') {
      localStorage.setItem('admin_token', 'authenticated');
      setLocation('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-serif text-primary">Admin Access</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enter password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-white/5 border-white/10 text-center tracking-widest"
            />
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
