import requests

url = "https://api.clashofclans.com/v1/clans/%232YCLRV22P/currentwar"
api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk0OWU4NDcwLTZiYWMtNGMwMy04YTYyLWM2YzhmOGEzNWY3OCIsImlhdCI6MTY4ODExMDA1MSwic3ViIjoiZGV2ZWxvcGVyL2M1N2E1MTcyLTQ1ZGItODNkMC1iNmE4LWQ5NWM3ZTZjMTk3MyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIyMS4xNTAuMzQuMTg2Il0sInR5cGUiOiJjbGllbnQifV19.k1PUmXy2PRiQo012bRsU9DpbSG8Emun9QIWyZA2SHpYlxfJOKvEVqVFQQPK-AqvpSNXiKEG7GXxAtvrLt4j7Nw"

headers = {
    "Authorization": f"Bearer {api_key}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    # 데이터 활용
    print(data)
else:
    print(f"Error making API request: {response.status_code} {response.reason}")

    # 디버깅을 위한 콘솔 출력
    print("Request URL:", response.request.url)
    print("Request Headers:", response.request.headers)
    print("Response Content:", response.content)
