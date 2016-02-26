echo "This script is very opiniated, check the source before continuing."

echo -n "Continue ? (y/n)"
read answer
if echo "$answer" | grep -iq "^y" ;then
  echo "alias n='npm start'" >> /home/libe/.bashrc
  echo "alias resync='sudo ntpdate ntp.ubuntu.com'" >> /home/libe/.bashrc
  echo "alias c9='node /home/libe/cloud9sdk/server.js -p 3333 --listen 0.0.0.0 -w /home/libe -a :'" >> /home/libe/.bashrc
  echo "alias commit='sh /home/libe/aquest/scripts/quick_commit.sh'" >> /home/libe/.bashrc
  echo "alias deploy='sls dash deploy'" >> /home/libe/.bashrc
  echo "alias deploy1='(cd /home/libe/aquest/comp-main/lambda_rendering && sls function deploy)'" >> /home/libe/.bashrc
  echo "alias deploy1e='(cd /home/libe/aquest/comp-main/lambda_rendering && sls endpoint deploy)'" >> /home/libe/.bashrc
  echo "alias deploy2='(cd /home/libe/aquest/comp-main/lambda_graphql && sls function deploy)'" >> /home/libe/.bashrc
  echo "alias deploy2e='(cd /home/libe/aquest/comp-main/lambda_graphql && sls endpoint deploy)'" >> /home/libe/.bashrc
  echo "alias deploytest='(cd /home/libe/aquest/comp-main/lambda_test && sls function deploy)'" >> /home/libe/.bashrc
  echo "alias deployteste='(cd /home/libe/aquest/comp-main/lambda_test && sls endpoint deploy)'" >> /home/libe/.bashrc
  
  echo "Completed. Type 'source /home/libe/.bashrc' to apply changes"
else
  echo "Aborted."
fi
