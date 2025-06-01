import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  return (
    <header className={cn('bg-white border-b border-gray-200 shadow-sm', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 text-xl font-bold">CommunityHub</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/dashboard"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              {user?.role === 'company' && (
                <>
                  <Link
                    to="/clients"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Clients
                  </Link>
                  <Link
                    to="/tickets"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Support Tickets
                  </Link>
                  <Link
                    to="/feedback"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Feedback
                  </Link>
                  <Link
                    to="/branding"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Branding
                  </Link>
                </>
              )}
              {user?.role === 'client' && (
                <>
                  <Link
                    to="/support"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Support
                  </Link>
                  <Link
                    to="/feedback"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Feedback
                  </Link>
                </>
              )}
            </nav>
          </div>
          
          {user ? (
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex items-center max-w-xs rounded-full focus:outline-none"
                    onClick={toggleProfileMenu}
                  >
                    <Avatar
                      src={user.avatarUrl}
                      name={user.name}
                      size="sm"
                    />
                  </button>
                </div>
                
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              
              <div className="ml-3 md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-4 bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Sign Up
              </Link>
              
              <div className="ml-3 md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            {user?.role === 'company' && (
              <>
                <Link
                  to="/clients"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  to="/tickets"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Support Tickets
                </Link>
                <Link
                  to="/feedback"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feedback
                </Link>
                <Link
                  to="/branding"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Branding
                </Link>
              </>
            )}
            {user?.role === 'client' && (
              <>
                <Link
                  to="/support"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Support
                </Link>
                <Link
                  to="/feedback"
                  className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feedback
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}