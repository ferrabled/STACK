// ConnectButton.tsx
import { Button, Card, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { CallGetAdminToOrg, CallIsAdministrator } from "components/wallet/contractCall";


const ConnectButton = () => {
  const navigate = useNavigate();

  //   const { activate, account, library, connector, active, deactivate } = useWeb3React()

  //   const [isActive, setIsActive] = useState(false)
  //   const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
  //   const [isLoading, setIsLoading] = useState(true)

  //   useEffect(() => {
  //     connect().then(val => {
  //         setIsLoading(false)
  //     })
  // }, [])

  const FlushLocalStorage = () => {
    window.localStorage.removeItem('orgId');
    window.localStorage.removeItem('userAddress');
  }

  const GetData = async (provider: any) => {
    console.log("User Wallet: ");
    const signer:any = provider.getSigner();
    signer.getAddress().then((addr: any) => {
      console.log(addr);
      
      //Retrieve if user has organization
      try {
        CallIsAdministrator(addr).then(isAdmin =>{
          if(isAdmin === true) {
            console.log("User is an administrator");
            CallGetAdminToOrg(addr).then(response => {
              const orgId = Number(ethers.BigNumber.from(response));
              console.log(orgId);
              
              
              //STORE DATA INTO LOCALSTORE
              window.localStorage.setItem('orgId', String(orgId));
              window.localStorage.setItem('userAddress', String(addr));
              
              navigate("/home");
            });
          }
          else {
            console.log("user is not an administrator");
          
            window.localStorage.setItem('userAddress', String(addr));
            navigate("/home");
          }   
          
        

      });
      } catch {
        //Could not connect / User reverted
      }
    });
  };


  // // Check when App is Connected or Disconnected to MetaMask

  // Connect to MetaMask wallet
  const connect = () => {
    FlushLocalStorage();
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then(() => {
        console.log("Connect success");
        console.log("Retrieving Data from user");
        GetData(provider);
      })
      .catch(() => {
        console.log("Error conectando la billetera");
      });
  };


  return (
    <Button
      className="w-80 h-24"
      variant="contained"
      color="primary"
      onClick={connect}
    >
      <Typography variant="h6">Ya tengo cuenta</Typography>
    </Button>
  );
};

export default ConnectButton;
