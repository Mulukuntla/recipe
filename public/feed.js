async function loadActivityFeed() {
    try {
      const token=localStorage.getItem("token")
      const response = await axios.get(`http://localhost:4008/follow/feed`,{headers :{"Authorization" :token}})
        console.log(response)
  
      const activities = response.data;  // Axios stores the response data in response.data
  
      const activityFeed = document.getElementById('activity-feed');
      activityFeed.innerHTML = '';  // Clear existing activity items
  
      activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.classList.add('activity-item');
        activityElement.innerHTML = `
          <p><strong>${activity.user.userName}</strong> ${activity.action}</p>
          <p>${activity.description}</p>
          <p><small>${new Date(activity.createdAt).toLocaleString()}</small></p>
        `;
        activityFeed.appendChild(activityElement);
      });
    } catch (error) {
      console.error('Error loading activity feed:', error);
    }
  }
  
  // Call loadActivityFeed() to load and display activities
  loadActivityFeed();