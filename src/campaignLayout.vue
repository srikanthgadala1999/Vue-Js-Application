<template>
    <div>
        <div v-if="isLoading" class="loading-overlay d-flex justify-content-center align-items-center">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: white;"></i>
        </div>
        <!-- Image Section -->
        <div class="row banner-cont">
            <div class="col-md-12">
                <img src="/Images/banner.png" alt="banner" class="banner-image" height="150px" />
            </div>
        </div>

        <!-- Content Section -->
        <div class="row banner-cont">
            <div class="col-md-12 content-container">
                <div class="col-md-6 about-challenge">
                    <div class="challenge-text"><span>What is WizFit Challenge?</span></div>
                    <div><img src="/Images/watch video.png" height="50px" width="60px" /></div>
                </div>
            </div>
            <div class="col-md-12 content-container">
                <img src="/Images/player.png" height="180px" width="280px" />
            </div>
            <div class="col-md-12 d-flex justify-content-center">
                <div class="col-md-6 take-chl-card">
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="take-challenge-text"><span>Are you ready to take the Challenge?</span></div>
                    </div>
                    <div class="col-md-12 d-grid justify-content-center app-padding">
                        <span class="download-text">Download Harlem Wizards App</span>
                        <div>
                            <img src="/Images/goolge-store.png" height="28px" width="100px" />
                            <img src="/Images/apple-store.png" height="28px" width="100px" />
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center align-items-center sign-up-content">
                        <div class="col-md-2">
                            <hr>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center"><span>or you can sign up right now</span>
                        </div>
                        <div class="col-md-2">
                            <hr>
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center align-items-center app-padding" :class="{'inp-src': isSearchApplied}">
                        <div :class="isSearchApplied ? 'col-md-6' : 'col-md-8'"><input v-model="searchText" class="w-100 campaign-input"
                                placeholder="Search Campaign here..." @keyup.enter="getSearch" /></div>
                                <div v-if="isSearchApplied" class="col-md-2 d-flex justify-content-center align-items-center"><span class="clr-src" @click="clearSrch">Clear</span></div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="col-md-8" v-if="campaignList.length > 0">
                            <div class="col-md-12 scl-list-cont cam-list-item" v-for="(td, index) in campaignList"
                                :key="`list-${index}`">
                                <div class="col-md-12 d-flex align-items-center list-cntn">
                                    <div class="col-md-8 d-flex align-items-center list-card">
                                        <img class="scl-img-cls" :src="td.logo ? td.logo : td.logo_url" />
                                        <span class="scl-scl-name" :title="td.school_name ? td.school_name : 'N/A'">{{ td.school_name ? td.school_name : 'N/A' }}</span>
                                    </div>
                                    <div class="col-md-4 join-cls"><button class="join-btn">Join Campaign</button> </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="col-md-8 d-flex align-items-center justify-content-center no-records-div">
                            No Records Found
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            campaignList: [],
            searchText: '',
            isSearchApplied: false,
            isLoading: false
        }
    },
    created() {
        this.fetchCampaignData()
    },
    methods: {
        fetchCampaignData() {
            let apiUrl;
            if (this.isSearchApplied) {
                apiUrl = `http://api.devharlemwizardsinabox.com/campaign/campaign_school_list/?search=${this.searchText}`
            } else apiUrl = `http://api.devharlemwizardsinabox.com/campaign/campaign_school_list/?search=`
            this.isLoading = true
            // Make the GET request using Axios
            axios.get(apiUrl)
                .then(response => {
                    // Set the response data to the schools array
                    this.campaignList = response.data?.school_list ? response.data.school_list : []; // Adjust based on your API response structure
                    this.isLoading = false
                })
                .catch(error => {
                    this.campaignList = []
                    this.isLoading = false
                    console.error('Error fetching schools:', error);
                });
        },
        getSearch() {
            if(this.searchText.trim().length > 0) {
                this.isSearchApplied = true
                this.fetchCampaignData()
            }
        },
        clearSrch() {
            this.isSearchApplied = false
            this.searchText = ''
            this.fetchCampaignData()
        }
    }
}
</script>