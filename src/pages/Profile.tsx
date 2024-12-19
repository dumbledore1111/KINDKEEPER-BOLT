import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmergencyContactForm } from '../components/profile/EmergencyContactForm';
import { LinkedBankForm } from '../components/profile/LinkedBankForm';
import { SettingsForm } from '../components/profile/SettingsForm';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <Button
              onClick={() => navigate('/dashboard')}
              className="text-3xl py-6 px-12 bg-[#FF6B2C]"
            >
              Back
            </Button>
            <Button
              onClick={handleLogout}
              className="text-3xl py-6 px-12 bg-red-500"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <main className="pt-32 pb-8 container mx-auto px-4 max-w-2xl">
        {/* User Info */}
        <Card variant="dark" className="mb-8 p-8">
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-3">{user.name}</h2>
            <p className="text-2xl text-white/60">{user.email}</p>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-3xl font-semibold">Emergency Contacts</h2>
            <Button
              variant="primary"
              onClick={() => setShowEmergencyForm(true)}
              className="text-2xl py-6"
            >
              Add Emergency Contact
            </Button>
          </div>
          
          {user.emergencyContacts?.map((contact: any) => (
            <Card key={contact.id} variant="dark" className="p-6 mb-4">
              <h3 className="text-2xl font-medium mb-2">{contact.name}</h3>
              <p className="text-xl text-white/60">{contact.relationship}</p>
              <p className="text-2xl text-white/80 mt-2">{contact.phone}</p>
            </Card>
          ))}
        </div>

        {/* Linked Banks */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-3xl font-semibold">Bank Accounts</h2>
            <Button
              variant="primary"
              onClick={() => setShowBankForm(true)}
              className="text-2xl py-6"
            >
              Add Bank Account
            </Button>
          </div>

          {user.linkedBanks?.map((bank: any) => (
            <Card key={bank.id} variant="dark" className="p-6 mb-4">
              <h3 className="text-2xl font-medium mb-2">{bank.bankName}</h3>
              <p className="text-xl text-white/60">{bank.accountType}</p>
              <p className="text-2xl text-white/80 mt-2">
                Account: ••••{bank.accountNumber.slice(-4)}
              </p>
            </Card>
          ))}
        </div>

        {/* Settings Button */}
        <Button
          variant="primary"
          onClick={() => setShowSettings(true)}
          className="w-full text-2xl py-6 mb-8"
        >
          Settings
        </Button>

      </main>

      {/* Forms */}
      <EmergencyContactForm
        isOpen={showEmergencyForm}
        onClose={() => setShowEmergencyForm(false)}
        userId={user.id}
        onSuccess={(newContact) => {
          const updatedUser = {
            ...user,
            emergencyContacts: [...(user.emergencyContacts || []), newContact]
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }}
      />

      <LinkedBankForm
        isOpen={showBankForm}
        onClose={() => setShowBankForm(false)}
        userId={user.id}
        onSuccess={(newBank) => {
          const updatedUser = {
            ...user,
            linkedBanks: [...(user.linkedBanks || []), newBank]
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }}
      />

      <SettingsForm
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
        onUpdate={(updatedSettings) => {
          const updatedUser = { ...user, ...updatedSettings };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }}
      />
    </div>
  );
}