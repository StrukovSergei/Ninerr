<template>
    <section class="mobil flex">
        <RouterLink to="/explore?category=Graphics+%26+Design">
            <span class="flex align-center">
                <span v-html="$svg('graphic')"></span>
                <div>
                    <h4 class="regular">Graphics & Design</h4>
                    <p>Logo & Brand identity, Gaming</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Digital+Marketing">
            <span class="flex align-center">
                <span v-html="$svg('marketing')"> </span>
                <div class="">
                    <h4 class="regular">Digital Marketing</h4>
                    <p>Social Medida Marketing, Search Engine Optimization (SEO)</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Writing+%26+Translation">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('writing')"></span>
                    <h4 class="regular">Writing & Translation</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Video+%26+Animation">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('video')"> </span>
                    <h4 class="regular">Video & Animation</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Music+%26+Audio">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('music')"> </span>
                    <h4 class="regular">Music & Audio</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Programming+%26+Tech">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('tech')"> </span>
                    <h4 class="regular">Programming & Tech</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Business">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('business')"></span>
                    <h4 class="regular">Business</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Lifestyle">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('lifestyle')"></span>
                    <h4 class="regular">Lifestyle</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Data">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('data')"></span>
                    <h4 class="regular">Data</h4>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Photography">
            <span class="flex align-center">
                <div>
                    <span v-html="$svg('photography')"></span>
                    <h4 class="regular">Photography</h4>
                </div>
            </span>
        </RouterLink>
    </section>
</template>

<script></script>

<style lang="scss" scoped>
.mobil {
    flex-direction: column;
    margin-inline-start: 10px;

    & span>* {
        border-block-end: 1px solid #c2c2c2;
    }

    svg {
        &.svg-graphic {
            .cls-4 {
                fill: none;
                stroke: #4d535b;
                stroke-miterlimit: 10;
                stroke-width: 2px;
            }
        }

        &.svg-writing {
            .cls-5 {
                fill: none;
                stroke: #4d535b;
                stroke-miterlimit: 10;
                stroke-width: 2px;
            }
        }

        &.svg-sound {
            .cls-4 {
                fill: none;
                stroke: #4d535b;
                stroke-miterlimit: 10;
                stroke-width: 2px;
            }
        }

        &.svg-tech {
            .cls-4 {
                fill: none;
                stroke: #4d535b;
                stroke-miterlimit: 10;
                stroke-width: 2px;
            }
        }

        &.svg-lifestyle {
            .cls-4 {
                fill: none;
                stroke: #4d535b;
                stroke-miterlimit: 10;
            }

            .cls-4 {
                stroke-width: 2.1px;
            }
        }

        &.svg-business {
            .cls-2 {
                fill: #fff;
            }
        }
    }
}

span:not(.flex) {
    display: flex;
    height: 60px;
}

h4 {
    font-family: Macan-light;
    color: #222325;
    margin: 0;
}
</style>
