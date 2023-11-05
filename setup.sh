sudo cp vuln.service /lib/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable vuln.service

sudo systemctl start vuln.service

sudo systemctl status vuln.service