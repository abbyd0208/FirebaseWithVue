<template>
    <div>
        <div class="container">
            <ul class="nav justify-content-end">
          
             <li class="nav-item">
                <router-link class="nav-link"  to="/about" >關於我</router-link>
            </li>
              <li class="nav-item">
                <router-link class="nav-link active"  to="/product-list">產品列表</router-link>
            </li>
        </ul>
        </div>
        
    </div>
</template>


<script>
export default {
    neme:'Header'
}
</script>
