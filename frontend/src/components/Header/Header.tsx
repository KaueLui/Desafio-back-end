import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Menu, LogOut, User, ListChecks, Tag } from "lucide-react";

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (auth) {
      auth.logout();
      navigate('/login');
    }
  };

  const getInitials = () => {
    if (!auth?.user) return "U";
    const username = auth.user;
    return username.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="text-xl font-bold">TaskManager</Link>
          
          <nav className="hidden md:flex space-x-4">
            <Link 
              to="/tasks" 
              className="flex items-center gap-2 hover:text-indigo-200 transition"
            >
              <ListChecks size={18} />
              <span>Tarefas</span>
            </Link>
            <Link 
              to="/tags" 
              className="flex items-center gap-2 hover:text-indigo-200 transition"
            >
              <Tag size={18} />
              <span>Tags</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline font-medium">
            Olá, {auth?.user || 'Visitante'}
          </span>
          
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="hidden md:flex bg-indigo-800 hover:bg-indigo-900 text-white"
          >
            <LogOut size={16} className="mr-2" /> Sair
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-indigo-800">
                <Avatar className="h-8 w-8 bg-indigo-800 text-white">
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center gap-2" asChild>
                <Link to="/dashboard">
                  <User size={16} />
                  <span>{auth?.user || 'Perfil'}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" asChild>
                <Link to="/tasks">
                  <ListChecks size={16} />
                  <span>Tarefas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" asChild>
                <Link to="/tags">
                  <Tag size={16} />
                  <span>Tags</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-500 focus:text-red-500" 
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;