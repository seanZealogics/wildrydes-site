window._config = {
  cognito: {
    userPoolId: "ap-northeast-1_ydq8sagKB", // e.g. us-east-2_uXboG5pAb
    userPoolClientId: "3eee4n4c6om19ckd3uaqp7a3i4", // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
    region: "ap-northeast-1", // e.g. us-east-2
  },
  api: {
    invokeUrl: "https://wrg404fuwj.execute-api.ap-southeast-2.amazonaws.com/prod", // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',	
	//fetchUrl: "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema", //DEMO
	//fetchUrl: "https://v9mk3hu2wk.execute-api.ap-northeast-3.amazonaws.com/resume/schema",//DEV
	fetchUrl: "https://pmpbluqli2.execute-api.ap-northeast-3.amazonaws.com/resume/schema",
	//functionUrl: "https://5qz5tinbeuaa2gqhjggl7gsovy0rmhvs.lambda-url.ap-northeast-1.on.aws/"
	//queryUrl: "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume"
	//queryUrl: "https://2rsi3py4lk.execute-api.ap-northeast-1.amazonaws.com/lowercase_resume"
	queryUrl: "https://qb9bzger6e.execute-api.ap-northeast-3.amazonaws.com/lowercase_resume",
	//chartUrl: "https://uvfgitrxxk.execute-api.ap-northeast-3.amazonaws.com/resume_summary"
	chartUrl: "https://f3gnl77ghjckne3obs4n24tyna0mgouj.lambda-url.ap-northeast-3.on.aws/"
  }
};