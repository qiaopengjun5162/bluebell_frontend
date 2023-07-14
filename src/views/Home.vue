<template>
    <div class="content">
        <div class="left">
            <!-- <h4 class="c-l-title">热门帖子</h4> -->
            <div class="c-l-header">
                <div class="new btn-iconfont" :class="{ active: timeOrder }" @click="selectOrder('time')">
                    <i class="iconfont icon-polygonred"></i>New
                </div>
                <div class="top btn-iconfont" :class="{ active: scoreOrder }" @click="selectOrder('score')">
                    <i class="iconfont icon-top"></i>Score
                </div>
                <button class="btn-publish" @click="goPublish">发表</button>
            </div>
            <ul class="c-l-list">
                <li class="c-l-item" v-for="post in postList" :key="post.id">
                    <div class="post">
                        <a class="vote">
                            <span class="iconfont icon-up" @click="vote(post.id, '1')"></span>
                        </a>
                        <span class="text">{{ post.vote_num }}</span>
                        <a class="vote">
                            <span class="iconfont icon-down" @click="vote(post.id, '-1')"></span>
                        </a>
                    </div>
                    <div class="l-container" @click="goDetail(post.id)">
                        <h4 class="con-title">{{ post.title }}</h4>
                        <div class="con-memo">
                            <p>{{ post.content }}</p>
                        </div>
                        <!-- <div class="user-btn">
                <span class="btn-item">
                  <i class="iconfont icon-comment"></i>
                  <span>{{post.comments}} comments</span>
                </span>
              </div> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="communities">
                <h2 class="r-c-title">今日火热频道排行榜</h2>
                <ul class="r-c-content">
                    <li class="r-c-item">
                        <span class="index">1</span>
                        <i class="icon"></i>
                        b/coding
                    </li>
                    <li class="r-c-item">
                        <span class="index">2</span>
                        <i class="icon"></i>
                        b/tree_hole
                    </li>
                    <li class="r-c-item">
                        <span class="index">3</span>
                        <i class="icon"></i>
                        b/job
                    </li>
                </ul>
                <button class="view-all">查看所有</button>
            </div>
            <div class="r-trending">
                <h2 class="r-t-title">持续热门频道</h2>
                <ul class="rank">
                    <li class="r-t-cell">
                        <div class="r-t-cell-info">
                            <div class="avatar"></div>
                            <div class="info">
                                <span class="info-title">b/Book</span>
                                <p class="info-num">7.1k members</p>
                            </div>
                        </div>
                        <button class="join-btn">JOIN</button>
                    </li>
                    <li class="r-t-cell">
                        <div class="r-t-cell-info">
                            <div class="avatar"></div>
                            <div class="info">
                                <span class="info-title">b/coding</span>
                                <p class="info-num">3.2k members</p>
                            </div>
                        </div>
                        <button class="join-btn">JOIN</button>
                    </li>
                    <li class="r-t-cell">
                        <div class="r-t-cell-info">
                            <div class="avatar"></div>
                            <div class="info">
                                <span class="info-title">b/job</span>
                                <p class="info-num">2.5k members</p>
                            </div>
                        </div>
                        <button class="join-btn">JOIN</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>  

<script lang="ts" setup>
</script>

<style>
</style>
