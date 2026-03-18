import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StockItem {
  slug: string;
  stock_quantity: number;
  is_active: boolean;
}

export function useStock(slug: string) {
  const [stock, setStock] = useState<StockItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data } = await supabase
        .from('product_stock')
        .select('slug, stock_quantity, is_active')
        .eq('slug', slug)
        .single();

      setStock(data ?? null);
      setLoading(false);
    };

    load();
  }, [slug]);

  const isOutOfStock =
    !loading && stock !== null && (stock.stock_quantity <= 0 || !stock.is_active);

  const isInactive = !loading && stock !== null && !stock.is_active;
  const quantity = stock?.stock_quantity ?? null;

  return { loading, isOutOfStock, isInactive, quantity };
}

export function useStockMap(slugs: string[]) {
  const [stockMap, setStockMap] = useState<Record<string, StockItem>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (slugs.length === 0) {
        setStockMap({});
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data } = await supabase
        .from('product_stock')
        .select('slug, stock_quantity, is_active')
        .in('slug', slugs);

      const map: Record<string, StockItem> = {};
      (data ?? []).forEach((item: StockItem) => {
        map[item.slug] = item;
      });

      setStockMap(map);
      setLoading(false);
    };

    load();
  }, [slugs.join(',')]);

  return { loading, stockMap };
}