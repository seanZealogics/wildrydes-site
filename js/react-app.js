const App = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.get("https://cors-anywhere.herokuapp.com/https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema")
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!response) {
    return <div>Loading...</div>;
  }

  return <div>{response.data}</div>;
};

export default App;
