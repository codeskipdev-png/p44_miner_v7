// PM2 deployment for the v7 wide-gate arm (runs ALONGSIDE v3/v4/v5/v6, own UID/port).
// Usage:  pm2 start serve/ecosystem.config.js   (from 04_our_miner_v7/)
// Config lives in 04_our_miner_v7/.env (loaded by python-dotenv in-process).
//
// NOTE: no retrain app here on purpose. v7 SHARES v3's artifact by symlink, so
// v3's retrain propagates automatically and the two arms always serve the same
// model — pos_frac stays the only difference between v3 and v7.

const ROOT = "/root/Skip/poker/SN126/04_our_miner_v7";
const PY = ROOT + "/.venv/bin/python";

module.exports = {
  apps: [
    {
      name: "p44_miner_v7",
      cwd: ROOT,
      script: PY,
      interpreter: "none",
      args: ["-m", "serve.miner", "--logging.info"],
      autorestart: true,
      max_restarts: 50,
      restart_delay: 15000,
      env: { PYTHONPATH: ROOT },
    },
  ],
};
