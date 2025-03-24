# OpenMarketProject

## 프로젝트 소개
물건 구매 서비스로 오픈마켓에 등록되어 있는 상품을 구매하고자 한다면 상품의 세부사항을 확인한 뒤, 장바구니에 넣어, 상품을 구매할 수 있습니다.

## 프로젝트 설명
오픈마켓 프로젝트는 JavaScript를 사용하여 상품 결제, 상품에 대한 CRUD를 구현한 프로젝트입니다.

https://leeminseo0117.github.io/OpenMarketProject/main.html
테스트 아이디: buyer1
테스트 비밀번호: weniv1234

## 프로젝트 구조
📦OpenMarketProject
 ┣ 📂.git
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜applypatch-msg.sample
 ┃ ┃ ┣ 📜commit-msg.sample
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample
 ┃ ┃ ┣ 📜post-update.sample
 ┃ ┃ ┣ 📜pre-applypatch.sample
 ┃ ┃ ┣ 📜pre-commit.sample
 ┃ ┃ ┣ 📜pre-merge-commit.sample
 ┃ ┃ ┣ 📜pre-push.sample
 ┃ ┃ ┣ 📜pre-rebase.sample
 ┃ ┃ ┣ 📜pre-receive.sample
 ┃ ┃ ┣ 📜prepare-commit-msg.sample
 ┃ ┃ ┣ 📜push-to-checkout.sample
 ┃ ┃ ┣ 📜sendemail-validate.sample
 ┃ ┃ ┗ 📜update.sample
 ┃ ┣ 📂info
 ┃ ┃ ┗ 📜exclude
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂refs
 ┃ ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┃ ┗ 📂remotes
 ┃ ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┃ ┣ 📜HEAD
 ┃ ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📜HEAD
 ┃ ┣ 📂objects
 ┃ ┃ ┣ 📂07
 ┃ ┃ ┃ ┗ 📜aafa2c031c47cc26d6639d0c80e159bca8a953
 ┃ ┃ ┣ 📂13
 ┃ ┃ ┃ ┗ 📜116e72de8b83438598def1f0fd10176e0d2ef2
 ┃ ┃ ┣ 📂14
 ┃ ┃ ┃ ┣ 📜8c450caaf109d65feb6e6cf30a74e7985b4684
 ┃ ┃ ┃ ┗ 📜a5f1c7bf4153c77de9fc5688bcb1c6d1827ee0
 ┃ ┃ ┣ 📂15
 ┃ ┃ ┃ ┗ 📜bd9e27ecb02c0357a878017e5379a4634407d6
 ┃ ┃ ┣ 📂1a
 ┃ ┃ ┃ ┗ 📜d4e3fa7de327e73cf22ea1f18436b4916b0747
 ┃ ┃ ┣ 📂1f
 ┃ ┃ ┃ ┗ 📜f7c4d2eb4f61f77b5e55021eb1fbf9b35fce98
 ┃ ┃ ┣ 📂23
 ┃ ┃ ┃ ┗ 📜13c1934ace0efea7eaf0f17280e59d7592f9f7
 ┃ ┃ ┣ 📂26
 ┃ ┃ ┃ ┗ 📜c2868491ddc5a4d5e0887880d2b20416d398e5
 ┃ ┃ ┣ 📂28
 ┃ ┃ ┃ ┗ 📜f4699e78d64cf6acd33b5bb4396e863a7327a1
 ┃ ┃ ┣ 📂2b
 ┃ ┃ ┃ ┗ 📜70fad06d1b26e7de88e2b2ab18d54c9bf684ac
 ┃ ┃ ┣ 📂31
 ┃ ┃ ┃ ┗ 📜f4bfd67debc0181fda4a41e3a0b2b0a4f576a2
 ┃ ┃ ┣ 📂32
 ┃ ┃ ┃ ┣ 📜a51d9c21b4bf0250cece1a6c40998e553933a3
 ┃ ┃ ┃ ┗ 📜d4cdfd495344c2c4af09686101b1cb518fc8ee
 ┃ ┃ ┣ 📂35
 ┃ ┃ ┃ ┗ 📜712effdcb728789df029fe145996bec8335d4b
 ┃ ┃ ┣ 📂38
 ┃ ┃ ┃ ┣ 📜84098950a8ca9e90ec52e4a05c85043c97ba8b
 ┃ ┃ ┃ ┣ 📜b627f1beb90bcd103dcb34caa2b8155d34132b
 ┃ ┃ ┃ ┗ 📜d6d69afdcd8c950c81d4ad43f1036750e4d695
 ┃ ┃ ┣ 📂48
 ┃ ┃ ┃ ┗ 📜2eee5e1e2e4b57bf4366de207970eb1340b21e
 ┃ ┃ ┣ 📂4b
 ┃ ┃ ┃ ┗ 📜5e0f5ab69f02d89410a092afc87e31b87872f3
 ┃ ┃ ┣ 📂4e
 ┃ ┃ ┃ ┣ 📜02c930df02a8051c70728c06a2d80560364880
 ┃ ┃ ┃ ┗ 📜1c9b3dd81d109fc1a5493bc3762c0915861414
 ┃ ┃ ┣ 📂4f
 ┃ ┃ ┃ ┗ 📜5940e6b50aa8be146d335e2be97eaa4897b9ae
 ┃ ┃ ┣ 📂50
 ┃ ┃ ┃ ┣ 📜6a6e2e151b5d1c9f8e09f4ae5f645ecabe52f7
 ┃ ┃ ┃ ┗ 📜cc677bfd1953548fb1ba7bc04fa83ad1e98762
 ┃ ┃ ┣ 📂51
 ┃ ┃ ┃ ┗ 📜fb8b7da595db86afa2267922df608a4dbea6fc
 ┃ ┃ ┣ 📂54
 ┃ ┃ ┃ ┗ 📜709560186724a0526b6e5c4ca4fb49305a426e
 ┃ ┃ ┣ 📂55
 ┃ ┃ ┃ ┗ 📜20d4920df3e122d97aab8a1eb721f7768a3ed2
 ┃ ┃ ┣ 📂5a
 ┃ ┃ ┃ ┗ 📜bbaad0270d82f39aa9ed362b155326406850d6
 ┃ ┃ ┣ 📂5b
 ┃ ┃ ┃ ┗ 📜8cf46f73c6ffc1dc601531b244f936ed9e8b17
 ┃ ┃ ┣ 📂5c
 ┃ ┃ ┃ ┗ 📜c7260d7a34f34256b5c313abe50165869f9a0d
 ┃ ┃ ┣ 📂5e
 ┃ ┃ ┃ ┗ 📜cd7f7eecb8da566548fa78f8a865edbf58e6c4
 ┃ ┃ ┣ 📂61
 ┃ ┃ ┃ ┗ 📜5647b3765b4f2e9077857dab390da2a11d91f7
 ┃ ┃ ┣ 📂64
 ┃ ┃ ┃ ┗ 📜d82b1e217e033d5dad239e40850b208013c4af
 ┃ ┃ ┣ 📂65
 ┃ ┃ ┃ ┗ 📜a1bfd8d3f01a4b30518dd86a3874130f9bee67
 ┃ ┃ ┣ 📂69
 ┃ ┃ ┃ ┗ 📜23769227e7c79d1d5b2411efc0050a8294430b
 ┃ ┃ ┣ 📂6a
 ┃ ┃ ┃ ┗ 📜eb565c4957796055d2bd925b27ed6f885dd149
 ┃ ┃ ┣ 📂70
 ┃ ┃ ┃ ┗ 📜4b6c8ac014bce9266facab5bd274c59af76288
 ┃ ┃ ┣ 📂71
 ┃ ┃ ┃ ┗ 📜86de09a166c3d1877ce654a56f55fb940c4737
 ┃ ┃ ┣ 📂77
 ┃ ┃ ┃ ┗ 📜97d48292c0a2b1a74cc09baf0a79489ae9d8bb
 ┃ ┃ ┣ 📂7d
 ┃ ┃ ┃ ┗ 📜58a9756f25a04fe504bd5bdfc7df4d0157f8c8
 ┃ ┃ ┣ 📂8b
 ┃ ┃ ┃ ┗ 📜ecb93edf87bb9ebda682787bba59b482885a93
 ┃ ┃ ┣ 📂8c
 ┃ ┃ ┃ ┗ 📜c8655157b9b3adffb99a6bb731810839e51973
 ┃ ┃ ┣ 📂90
 ┃ ┃ ┃ ┗ 📜46598c2ae0348f41cd397084301d8d5fd96a1f
 ┃ ┃ ┣ 📂92
 ┃ ┃ ┃ ┗ 📜6930e43e1f45f7c851ca44ccebcbed2e44d050
 ┃ ┃ ┣ 📂93
 ┃ ┃ ┃ ┗ 📜0cf43558b3be503be60c6060627777cb4decc5
 ┃ ┃ ┣ 📂94
 ┃ ┃ ┃ ┗ 📜b39b27018e80c7ef264f29576261eaa32f0b2b
 ┃ ┃ ┣ 📂97
 ┃ ┃ ┃ ┗ 📜8418d019c2304af293934ff5a56a4f5e1dc0d1
 ┃ ┃ ┣ 📂9f
 ┃ ┃ ┃ ┗ 📜d39ff294d0f30bc0ffbd76d838d665c057de99
 ┃ ┃ ┣ 📂a2
 ┃ ┃ ┃ ┗ 📜4cada8955279b0367a5a406d7f05bd7e3fe550
 ┃ ┃ ┣ 📂a3
 ┃ ┃ ┃ ┗ 📜83037e26dc525fdcfbac92d8650f9b19275e11
 ┃ ┃ ┣ 📂a4
 ┃ ┃ ┃ ┗ 📜8bceb9cec65a2233f06c753afc71710b5a7605
 ┃ ┃ ┣ 📂a7
 ┃ ┃ ┃ ┗ 📜a9c6776500a63c01dee044d6f6c85f2747ac6a
 ┃ ┃ ┣ 📂a8
 ┃ ┃ ┃ ┗ 📜ffeb56536ed34322f325bf39758cf6afdece39
 ┃ ┃ ┣ 📂ab
 ┃ ┃ ┃ ┗ 📜4773a509d2857ddb70539e89ddd26e25a20a12
 ┃ ┃ ┣ 📂ac
 ┃ ┃ ┃ ┗ 📜cac9cf4d982770cdf35157fbfb4dab7468c13b
 ┃ ┃ ┣ 📂ae
 ┃ ┃ ┃ ┗ 📜b921db0787eafcf16854c42836d263e2663312
 ┃ ┃ ┣ 📂af
 ┃ ┃ ┃ ┗ 📜8c3546724626291d1326658bc58e30d5147fc9
 ┃ ┃ ┣ 📂b2
 ┃ ┃ ┃ ┗ 📜f4a48d56b1903cc8028f9def3a3704d07a73fc
 ┃ ┃ ┣ 📂b8
 ┃ ┃ ┃ ┗ 📜d55c570d6159879bb925854ec063c9238da2ed
 ┃ ┃ ┣ 📂bb
 ┃ ┃ ┃ ┗ 📜46c7737416803a94c57b9c4849a791c4d53f31
 ┃ ┃ ┣ 📂bd
 ┃ ┃ ┃ ┣ 📜7cb929fe0b58ac073a77f31cc529f3c92c5ef0
 ┃ ┃ ┃ ┣ 📜dd7361734067a79eaab70811a12dbba487f74d
 ┃ ┃ ┃ ┗ 📜ec3791601942e1ef52d8ffe23752874886bf26
 ┃ ┃ ┣ 📂c1
 ┃ ┃ ┃ ┗ 📜b2b88c63a7494275af448d4ced6ce30d90acbd
 ┃ ┃ ┣ 📂c3
 ┃ ┃ ┃ ┗ 📜73060eb8137d10c2a27f8769f3de2d9a5d7a34
 ┃ ┃ ┣ 📂c9
 ┃ ┃ ┃ ┗ 📜5917deb5b07b4d5d45988512d4384c0fdd4022
 ┃ ┃ ┣ 📂cb
 ┃ ┃ ┃ ┗ 📜196f8f11069b23b796753b136777d587a09da7
 ┃ ┃ ┣ 📂cc
 ┃ ┃ ┃ ┗ 📜8a89ebc38b2b439566755337170e0829f8398b
 ┃ ┃ ┣ 📂cd
 ┃ ┃ ┃ ┗ 📜6b22885cb088f65649c5f8068d627bd717ec09
 ┃ ┃ ┣ 📂ce
 ┃ ┃ ┃ ┗ 📜8d063cf839bf1e15b5771280d686f1bd08aefe
 ┃ ┃ ┣ 📂d2
 ┃ ┃ ┃ ┗ 📜09e2a9a0a00687d2a98ee1c8efd818bc26bf9f
 ┃ ┃ ┣ 📂d3
 ┃ ┃ ┃ ┣ 📜8d4fb96e41febe7082fde402c4f68712da777d
 ┃ ┃ ┃ ┗ 📜eb818a022c55519132fae5a031fae3addf1556
 ┃ ┃ ┣ 📂d8
 ┃ ┃ ┃ ┗ 📜cea3786d777c3096389d0c782d0db9f1cf7c85
 ┃ ┃ ┣ 📂da
 ┃ ┃ ┃ ┣ 📜a79e095fef7ae33343e269e3302af75e838d5c
 ┃ ┃ ┃ ┗ 📜eb11a3b94c7ddd612b0dab336cafa715ff4441
 ┃ ┃ ┣ 📂e3
 ┃ ┃ ┃ ┗ 📜d351a1fdc6ed548d95bb4148dfd4704d17312f
 ┃ ┃ ┣ 📂e8
 ┃ ┃ ┃ ┗ 📜58dd69643d319f97827538854a94cec98966eb
 ┃ ┃ ┣ 📂e9
 ┃ ┃ ┃ ┗ 📜77af939cd14d1ba83153810d68e1c758d8e90c
 ┃ ┃ ┣ 📂ec
 ┃ ┃ ┃ ┗ 📜7591098dc3519186c07c87047861ac44c022bb
 ┃ ┃ ┣ 📂f5
 ┃ ┃ ┃ ┗ 📜adfc7079d526b2d03840b77618d6ac96bb4f8d
 ┃ ┃ ┣ 📂fc
 ┃ ┃ ┃ ┗ 📜4565e630d9b40d946df4ad346546d53c484513
 ┃ ┃ ┣ 📂info
 ┃ ┃ ┗ 📂pack
 ┃ ┃ ┃ ┣ 📜pack-7c450e3e65f32ed41d44d61a5292cd4030b1cb4d.idx
 ┃ ┃ ┃ ┣ 📜pack-7c450e3e65f32ed41d44d61a5292cd4030b1cb4d.pack
 ┃ ┃ ┃ ┗ 📜pack-7c450e3e65f32ed41d44d61a5292cd4030b1cb4d.rev
 ┃ ┣ 📂refs
 ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┣ 📂remotes
 ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┣ 📜HEAD
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📂tags
 ┃ ┣ 📜COMMIT_EDITMSG
 ┃ ┣ 📜FETCH_HEAD
 ┃ ┣ 📜HEAD
 ┃ ┣ 📜ORIG_HEAD
 ┃ ┣ 📜config
 ┃ ┣ 📜description
 ┃ ┣ 📜index
 ┃ ┗ 📜packed-refs
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂src
 ┃ ┣ 📜404.png
 ┃ ┣ 📜Logo-hodu.svg
 ┃ ┣ 📜Vector.svg
 ┃ ┣ 📜icon-delete.svg
 ┃ ┣ 📜icon-fb.svg
 ┃ ┣ 📜icon-insta.svg
 ┃ ┣ 📜icon-shopping-bag.svg
 ┃ ┣ 📜icon-shopping-cart-2.svg
 ┃ ┣ 📜icon-shopping-cart.svg
 ┃ ┣ 📜icon-user-2.svg
 ┃ ┣ 📜icon-user.svg
 ┃ ┣ 📜icon-yt.svg
 ┃ ┗ 📜search.svg
 ┣ 📜ProductDetails.css
 ┣ 📜ProductDetails.html
 ┣ 📜ProductDetails.js
 ┣ 📜README.md
 ┣ 📜auth.js
 ┣ 📜main.css
 ┣ 📜main.html
 ┣ 📜main.js
 ┣ 📜notFound.css
 ┣ 📜notFound.html
 ┣ 📜payment.css
 ┣ 📜payment.html
 ┣ 📜payment.js
 ┣ 📜reset.css
 ┣ 📜shoppingCart.css
 ┣ 📜shoppingCart.html
 ┣ 📜shoppingCart.js
 ┣ 📜signIn.css
 ┣ 📜signIn.html
 ┣ 📜signIn.js
 ┣ 📜signUp.css
 ┣ 📜signUp.html
 ┗ 📜signUp.js
