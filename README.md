# sse_streaming_sample
sse streaming sample

## usage
```
npm install
node index.js
```

## sse
### URL
/streaming

### event
|event|data|id|
|---|---|---|
|message|USD/JPY dummy rate|incremental data id|

## docker
```
docker pull nagaomao/sse_streaming_sample
docker run -p 3000:8080 -d nagaomao/sse_streaming_sample
curl http://localhost:3000/streaming
```