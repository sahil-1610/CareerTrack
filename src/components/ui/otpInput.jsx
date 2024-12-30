"use client";
import React, { useState, useRef, useEffect } from 'react';

export function OTPInput({ length = 6, onComplete, onChange, disabled = false }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (!/^\d?$/.test(element.value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);

    // Call onChange with current OTP value
    const otpString = updatedOtp.join('');
    onChange?.(otpString);

    // Move to next input if value exists
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    if (updatedOtp.every(digit => digit !== '') && otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center" role="group" aria-label="OTP input">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          className="w-12 h-12 text-center border-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:border-blue-500 focus:outline-none text-xl"
          autoComplete="off"
        />
      ))}
    </div>
  );
}
