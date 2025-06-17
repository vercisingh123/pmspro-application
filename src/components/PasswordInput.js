import React, { useState } from "react";

// Simple emoji icons for show/hide; you can swap these for real icons later!
const Eye = () => <span role="img" aria-label="Show">👁️</span>;
const EyeOff = () => <span role="img" aria-label="Hide">🙈</span>;

export function PasswordInput({ label, value, onChange, name }) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((v) => !v);

  return (
    <div style={{ marginBottom: 16 }}>
      <label>
        {label}
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={visible ? "text" : "password"}
            value={value}
            onChange={onChange}
            name={name}
            autoComplete="current-password"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            style={{
              marginLeft: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
            }}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </label>
    </div>
  );
}
