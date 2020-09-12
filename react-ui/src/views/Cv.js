import React from 'react';
import DeveloperProfile from '@welovedevs/react-ultimate-resume';

function CV(){
    var options = {};
    var data = {};

    let  topicId  = useParams();
    console.log(topicId);
    const [message, setMessage] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [url, setUrl] = useState(`/api/cv?lang=en`);

    let searchBarVal = "";

    const fetchData = useCallback(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
            let val = {};
            if(json.result == "Error"){
              throw 'What are you doing here ?';
            }
            val = JSON.parse(json.content);
            setMessage(val);
            setIsFetching(false);
        }).catch(e => {
          setMessage(`API call failed: ${e}`);
          setIsFetching(false);
        })
    }, [url]);
  
    useEffect(() => {
      setIsFetching(true);
      fetchData();
    }, [fetchData]);

    const options = {
      locale:'en'
    }


    return (
      <DeveloperProfile 
        data={message}
        options={options}
        additionalNodes={{
            banner: {
                actionsButtons: mode === 'edit' && (
                    <Button variant="outlined" onClick={handleClick} color={'light'}>
                        <SaveIcon className={classes.saveIcon} />
                        <FormattedMessage id="Profile.header.jsonResume.download" defaultMessage="Export" />
                    </Button>
                )
            }
        }}
      />
    );
}

export default CV;