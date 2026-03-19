'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [keyId, setKeyId] = useState('');
  const [keyError, setKeyError] = useState('');
  const [rzpStatus, setRzpStatus] = useState('checking...');
  const [scriptStatus, setScriptStatus] = useState('not loaded');

  useEffect(() => {
    // Test 1: payment-config
    fetch('/api/payment-config')
      .then(r => r.json())
      .then(d => {
        if (d.keyId) setKeyId(d.keyId);
        else setKeyError(JSON.stringify(d));
      })
      .catch(err => setKeyError(err.message));

    // Test 2: Load Razorpay script manually
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      setScriptStatus('loaded ✅');
      setRzpStatus(typeof (window as any).Razorpay !== 'undefined' ? 'window.Razorpay exists ✅' : 'window.Razorpay missing ❌');
    };
    script.onerror = (e) => {
      setScriptStatus('FAILED to load ❌ — ' + JSON.stringify(e));
    };
    document.head.appendChild(script);

    // Poll for window.Razorpay
    const interval = setInterval(() => {
      if (typeof (window as any).Razorpay !== 'undefined') {
        setRzpStatus('window.Razorpay exists ✅');
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const testPayment = async () => {
    if (!(window as any).Razorpay) {
      alert('window.Razorpay is undefined — script not loaded!');
      return;
    }
    if (!keyId) {
      alert('No keyId — payment-config failed!');
      return;
    }

    // Test create-order
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ slug: 'kitaya-assam-250g', quantity: 1 }],
        shippingAmount: 0,
        receipt: 'debug_test',
      }),
    });
    const data = await res.json();
    alert('create-order response: ' + JSON.stringify(data));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '2' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>Razorpay Debug</h1>

      <div><strong>payment-config keyId:</strong> {keyId || <span style={{color:'red'}}>{keyError || 'loading...'}</span>}</div>
      <div><strong>Razorpay script:</strong> {scriptStatus}</div>
      <div><strong>window.Razorpay:</strong> {rzpStatus}</div>

      <br />
      <button
        onClick={testPayment}
        style={{ padding: '10px 20px', background: '#C5A55A', border: 'none', cursor: 'pointer', fontSize: '14px' }}
      >
        Test create-order API
      </button>

      <br /><br />
      <div style={{ color: '#888' }}>
        Open DevTools → Console for any errors<br />
        Open DevTools → Network and look for failed requests
      </div>
    </div>
  );
}