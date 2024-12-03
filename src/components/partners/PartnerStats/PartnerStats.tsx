import { useMemo } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { getCategoryIcon } from '@/utils/categoryIcons';
import type { Partner } from '@/types';

interface PartnerStatsProps {
  partners: Partner[];
}

interface CategoryStats {
  name: string;
  count: number;
  color: string;
}

export function PartnerStats({ partners }: PartnerStatsProps) {
  const theme = useTheme();

  const stats = useMemo(() => {
    const mainCategories = new Map<string, number>();
    const subCategories = new Map<string, number>();

    partners.forEach(partner => {
      if (partner.categoryPath.length > 0) {
        // Statistiques par catégorie principale
        const mainCategory = partner.categoryPath[0];
        mainCategories.set(
          mainCategory, 
          (mainCategories.get(mainCategory) || 0) + 1
        );

        // Statistiques par sous-catégorie
        if (partner.categoryPath.length > 1) {
          const subCategory = partner.categoryPath[1];
          subCategories.set(
            subCategory,
            (subCategories.get(subCategory) || 0) + 1
          );
        }
      }
    });

    const mainCategoryData: CategoryStats[] = Array.from(mainCategories.entries())
      .map(([name, count]) => ({
        name,
        count,
        color: getCategoryIcon(name).color
      }))
      .sort((a, b) => b.count - a.count);

    const subCategoryData: CategoryStats[] = Array.from(subCategories.entries())
      .map(([name, count]) => ({
        name,
        count,
        color: getCategoryIcon(name).color
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 sous-catégories

    return {
      mainCategories: mainCategoryData,
      subCategories: subCategoryData,
      total: partners.length
    };
  }, [partners]);

  if (partners.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" align="center" color="text.secondary">
            Aucun partenaire enregistré
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Statistiques des partenaires
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: 400,
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Répartition par catégorie principale
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.mainCategories}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {stats.mainCategories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={theme.palette.background.paper}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} partenaire${value > 1 ? 's' : ''}`,
                    name
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              height: 400,
              bgcolor: 'grey.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Top 5 des sous-catégories
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.subCategories}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${value} partenaire${value > 1 ? 's' : ''}`,
                    'Nombre'
                  ]}
                />
                <Bar 
                  dataKey="count" 
                  fill={theme.palette.primary.main}
                  radius={[0, 4, 4, 0]}
                >
                  {stats.subCategories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap' 
            }}
          >
            <Card sx={{ flexGrow: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h3" align="center" color="primary">
                  {stats.total}
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary">
                  Partenaires au total
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flexGrow: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h3" align="center" color="primary">
                  {stats.mainCategories.length}
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary">
                  Catégories principales
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flexGrow: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h3" align="center" color="primary">
                  {stats.subCategories.length}
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary">
                  Sous-catégories actives
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}