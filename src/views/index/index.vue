<template>
    <div class="index">
        <div class="content">
            <h1 class="head">Dashboard</h1>
            <a-row type="flex" :gutter="30" justify="center" align="top">
                <a-col :span="12">
                    <div class="left">
                        <a-row type="flex" align="middle" :gutter="[0, 30]">
                            <a-col :span="24">
                                <div class="l-card"></div>
                            </a-col>
                            <a-col :span="24">
                                <div class="l-card b-card"></div>
                            </a-col>
                        </a-row>
                    </div>
                </a-col>
                <a-col :span="12">
                    <div class="right">
                         <a-row type="flex" :gutter="[0, 30]" align="middle">
                            <a-col :span="24">
                                <a-row type="flex"  align="middle" :gutter="30">
                                    <a-col :span="12">
                                        <div class="r-card"></div>
                                    </a-col>
                                    <a-col :span="12">
                                        <div class="r-card"></div>
                                    </a-col>
                                </a-row>
                            </a-col>
                        <a-col :span="24">
                            <a-row type="flex"  align="middle" :gutter="[0, 30]">
                                <a-col :span="24">
                                    <div class="a-card"></div>
                                </a-col>
                                <a-col :span="24">
                                    <div class="a-card"></div>
                                </a-col>
                            </a-row>
                        </a-col>
                        </a-row>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div> 
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'index'
})
</script>
<style lang="less">
    .index {
        background-color: #f0f2f5;
        width: 100%;
        min-height: 100vh;
        .head {
            text-align: left;
        }
        .l-card {
            border-radius: .25rem;
            height: 30vh;
            background-color: #fff;
        }
        .b-card {
            height: 55vh;
        }
        .r-card {
            background-color: #fff;
            height: 20vh;
            border-radius: .25rem;
        }
        .a-card {
            height: 30vh;
            background: #fff;
        }
        .head {
            font-size: 24px;
            font-weight: 400;
        }
    }
    .m-dark {
        .index {
            background-color: #2c2c43;
            color: #cacbd6;
            .head {
                color: #cacbd6;
            }
            .l-card,.r-card,.a-card {
                background: #223;
            }
        }
    }
</style>