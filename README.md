# ComGo
Welcome to ComGo, please create an account or log in to start tracking your impact

## API for devlopers
The ComGo API contains information 

## Deployment
The project is hosted on GitHub. 

### Prerequisites
Make sure you have Node.js 6.9.0 or higher installed. If not, install it 

```sh
# Check your node version using this command
node --version
```
Make sure you have MongoDB installed. If not, install it ([Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) is recommended).


### Environment Setup
```sh
# Clone the project
git clone https://github.com/ComGo/api.git
cd ComGo

# Install the node_modules
npm install
```
### Development mode
For running this application, you have to specify certificate path, stellar accountId and Secret.

```sh
CERT_PATH=<path>/ ACCOUNT_ID=<accountId> ACCOUNT_SECRET=<secret> npm start
```

### Testing mode
For running this application, you have to specify certificate path, stellar accountId, Secret and TLS_flag.

```sh
CERT_PATH=<path>/ ACCOUNT_ID=<accountId> ACCOUNT_SECRET=<secret> TLS_FLAG=0 npm test
```
## License


## Credits

-
