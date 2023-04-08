<template>
  <div>
    <h1 class="text-white  mt-3">Dashboard</h1>
    <hr />
    <div class="row">
      <div class="col-md-3">
        <div class="card bg-primary text-white">
          <div class="card-body text-center text-black">
            <h1 class="card-title">{{ userCount }}</h1>
            <p class="card-text">All Users</p>
            <button class="" @click="AllUser()"></button>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-body text-center" style="color: rgb(240, 88, 113)">
            <h1 class="card-title">{{ femaleUsersCount }}</h1>
            <p class="card-text">Female Users</p>
            <button class="" @click="FemaleUser()"></button>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" >
          <div class="card-body text-center" style="color: rgb(3, 3, 87)">
            <h1 class="card-title">{{ maleUsersCount }}</h1>
            <p class="card-text">Male Users</p>
            <button class="" @click="MaleUser()"></button>
            
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" >
          <div class="card-body text-center" style="color: rgb(238, 199, 26)">
            <h1 class="card-title">{{ nullGenderUsersCount }}</h1>
            <p class="card-text">No Gender Users</p>
            <button class="" @click="NoGenderUser()"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="container col-md-6 offset-md-3 mt-5 text-white"></div>
    <h5 class="mt-5 text-white">List of all Users</h5>
    <hr>
    <div class="container col-md-6 offset-md-3 mt-5 text-black">
      <div class="card shadow bg-aliceblue" >
      <div class="card-header">
        <h1 class="text-center text-white">List Of All User</h1>
      <thead >
        <tr class="text-black">
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Contact Number</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          :class="{
            'bg-blue': user.gender === 'Male',
            'bg-pink': user.gender === 'Female',
            'bg-null': !user.gender
          }"
        >
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.contactNumber }}</td>
        </tr>
      </tbody>
    </div>
  </div>
  </div>
  </div>


  
</template>
<style>
  .container{
    position: flex;
    height: 100;
    width: 100%;
  }

</style>

<script>
import { ref, computed } from 'vue'
import { auth, db } from '../Firebase/index.js'
import { onSnapshot, collection } from 'firebase/firestore'

export default {
  setup() {
    const users = ref([])
    const maleUsersCount = ref(0)
    const femaleUsersCount = ref(0)
    const nullGenderUsersCount = ref(0)

    onSnapshot(collection(db, 'users'), (snapshot) => {
      users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      users.value.sort((a, b) => {
        if (a.gender === 'Male') {
          return -1
        } else if (a.gender === 'Female' && b.gender !== 'Male') {
          return -1
        } else if (!a.gender && (b.gender === 'Female' || b.gender === 'Male')) {
          return 1
        } else {
          return 0
        }
      })

      maleUsersCount.value = users.value.filter((user) => user.gender === 'Male').length
      femaleUsersCount.value = users.value.filter((user) => user.gender === 'Female').length
      nullGenderUsersCount.value = users.value.filter((user) => !user.gender).length
    })

    const userCount = computed(() => {
      return users.value.length
    })

    return {
      users,
      userCount,
      maleUsersCount,
      femaleUsersCount,
      nullGenderUsersCount
    }
  }
}
</script>

<style>
.bg-black {
  background-color:black(3, 3, 87);
  color: rgb(14, 14, 14);
}

.bg-pink {
  background-color:pink(240, 88, 113);
}

.bg-null {
  background-color: rgb(238, 199, 26);
}
.card:hover{
  cursor: pointer;
}

</style>

