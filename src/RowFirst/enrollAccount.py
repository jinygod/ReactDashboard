import requests

url = "https://api.clashofclans.com/v1/players/%23UG8VQQPL/verifytoken"
api_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk0OWU4NDcwLTZiYWMtNGMwMy04YTYyLWM2YzhmOGEzNWY3OCIsImlhdCI6MTY4ODExMDA1MSwic3ViIjoiZGV2ZWxvcGVyL2M1N2E1MTcyLTQ1ZGItODNkMC1iNmE4LWQ5NWM3ZTZjMTk3MyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIyMS4xNTAuMzQuMTg2Il0sInR5cGUiOiJjbGllbnQifV19.k1PUmXy2PRiQo012bRsU9DpbSG8Emun9QIWyZA2SHpYlxfJOKvEVqVFQQPK-AqvpSNXiKEG7GXxAtvrLt4j7Nw"

headers = {
    "Authorization": f"Bearer {api_token}",
    "Content-Type": "application/json"  # Request Body의 데이터 타입을 명시
}

data = {
    "token": "3bahrdyg"  # 실제 토큰 값으로 대체
}

# POST 요청 보내기
response = requests.post(url, headers=headers, json=data)

# 응답 처리
if response.status_code == 200:
    result = response.json()
    # 결과 처리
    print(result)
else:
    print(f"Error making API request: {response.status_code} {response.reason}")
