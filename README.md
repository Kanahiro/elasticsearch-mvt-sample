# elasticsearch-mvt-sample

## サーバーのローンチ

```
cd elasticsearch-mvt-sample
docker-compose up -d
```

http://localhost
上記でテストページが開きます。

## データのダウンロード・インサート

```sh
cd scripts
./download.sh
./insert.sh
```

- 国土数値情報「行政区域データ」
- geofabrik/hokkaido