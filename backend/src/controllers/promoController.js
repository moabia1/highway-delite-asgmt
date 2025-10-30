const promos = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};
exports.validatePromo = (req, res) => {
  const { code, subtotal } = req.body;

  if (!code) return res.json({ valid: false });

  const p = promos[code.toUpperCase()];

  if (!p) return res.json({ valid: false });

  let discount = 0;
  if (p.type === "percent") discount = Math.round(subtotal * (p.value / 100));
  else discount = p.value;
  
  res.json({ valid: true, code: code.toUpperCase(), discount });
};
