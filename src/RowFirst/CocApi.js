import axios from 'axios';

const API_URL = 'https://api.example.com'; // API 엔드포인트 URL

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEzMGVhMWZjLTkzMTgtNDRjOC05YTE5LTk3ODY1ZjZmZDNiOCIsImlhdCI6MTY4ODEwNzg5Niwic3ViIjoiZGV2ZWxvcGVyL2M1N2E1MTcyLTQ1ZGItODNkMC1iNmE4LWQ5NWM3ZTZjMTk3MyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIyMS4xNTAuMzQuMTg2Il0sInR5cGUiOiJjbGllbnQifV19.fHWepc8V0lzgCtxatQnXp8ZreTpJre6V2Z5sZ0h6qNrUpI6v-eNY1P91QdZp3A7toQ5ZaiASZgYClxvPN6SKtg';

const fetchMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        description: 'For searching member who doesn\'t attack the clan war',
      },
    });

    const members = response.data;
    console.log('Fetched members:', members);
    // 여기서 members 데이터를 원하는 방식으로 활용할 수 있습니다.
  } catch (error) {
    console.log('Error fetching members:', error);
  }
};

fetchMembers();
