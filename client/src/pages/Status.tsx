import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import type { StatusCheck } from "@shared/schema";

interface StatusResponse {
  timestamp: string;
  checks: StatusCheck[];
  summary: StatusCheck[];
}

interface History24h {
  [serviceName: string]: StatusCheck[];
}

export default function Status() {
  const { data, isLoading, refetch, isFetching } = useQuery<StatusResponse>({
    queryKey: ["/api/status"],
    refetchInterval: 60000, // Auto-refresh every minute
  });

  const { data: history } = useQuery<StatusCheck[]>({
    queryKey: ["/api/status/history"],
  });

  const { data: history24h } = useQuery<History24h>({
    queryKey: ["/api/status/history/24h"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-6 w-6 text-chart-3" />;
      case "degraded":
        return <AlertCircle className="h-6 w-6 text-chart-4" />;
      case "down":
        return <XCircle className="h-6 w-6 text-destructive" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-chart-3";
      case "degraded":
        return "bg-chart-4";
      case "down":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded Performance";
      case "down":
        return "Down";
      default:
        return "Unknown";
    }
  };

  // Calculate overall status
  const getOverallStatus = () => {
    if (!data?.summary) return "checking";
    
    const statuses = data.summary.map(s => s.status);
    if (statuses.some(s => s === "down")) return "down";
    if (statuses.some(s => s === "degraded")) return "degraded";
    if (statuses.every(s => s === "operational")) return "operational";
    return "checking";
  };

  const overallStatus = getOverallStatus();

  // Create 24h calendar for a service
  const render24hCalendar = (serviceName: string) => {
    if (!history24h || !history24h[serviceName] || history24h[serviceName].length === 0) {
      return (
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2 h-6 bg-muted rounded-sm" title="No data" />
          ))}
        </div>
      );
    }

    const checks = history24h[serviceName];
    const now = new Date();
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      return hour;
    });

    return (
      <div className="flex gap-1 mt-2">
        {hours.map((hour, i) => {
          // Find checks for this hour
          const hourChecks = checks.filter(check => {
            const checkDate = new Date(check.checkedAt);
            return checkDate.getHours() === hour.getHours() &&
                   checkDate.getDate() === hour.getDate();
          });

          let status = "unknown";
          if (hourChecks.length > 0) {
            // Take the most recent check for this hour
            const lastCheck = hourChecks[0];
            status = lastCheck.status;
          }

          const color = status === "operational" 
            ? "bg-chart-3" 
            : status === "degraded" 
            ? "bg-chart-4" 
            : status === "down" 
            ? "bg-destructive" 
            : "bg-muted";

          const hourLabel = hour.getHours();
          const statusLabel = status === "operational" 
            ? "Operational" 
            : status === "degraded" 
            ? "Degraded" 
            : status === "down" 
            ? "Down" 
            : "No data";

          return (
            <div 
              key={i} 
              className={`w-2 h-6 ${color} rounded-sm cursor-help`}
              title={`${hourLabel}:00 - ${statusLabel}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <SEO
        title="System Status - AgentiLab.ai"
        description="Real-time status monitoring for all AgentiLab services and projects"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-status-title">
            System Status
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Real-time monitoring of all services and projects
          </p>
          
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            variant="outline"
            data-testid="button-refresh-status"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Checking...' : 'Refresh Status'}
          </Button>
        </motion.div>

        {/* Overall Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full ${getStatusColor(overallStatus)} flex items-center justify-center`}>
                {getStatusIcon(overallStatus)}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-2" data-testid="text-overall-status">
                  {isLoading ? "Checking Systems..." : getStatusText(overallStatus)}
                </h2>
                {data?.timestamp && (
                  <p className="text-sm text-muted-foreground">
                    Last checked: {new Date(data.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold mb-6">Services</h2>
          
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading status...
            </div>
          ) : (
            <div className="space-y-4">
              {data?.summary?.map((check, index) => (
                <motion.div
                  key={`${check.serviceName}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6" data-testid={`card-service-${check.serviceName.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(check.status)}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg" data-testid={`text-service-name-${index}`}>
                            {check.serviceName}
                          </h3>
                          {check.serviceName !== "Client Dashboard" && (
                            <p className="text-sm text-muted-foreground truncate">
                              {check.serviceUrl}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(check.status)}
                          <span className="font-medium" data-testid={`text-service-status-${index}`}>
                            {getStatusText(check.status)}
                          </span>
                        </div>
                        {check.responseTime && (
                          <p className="text-sm text-muted-foreground">
                            {check.responseTime}ms
                          </p>
                        )}
                        {check.errorMessage && (
                          <p className="text-sm text-destructive">
                            {check.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* 24h history calendar */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Last 24 hours</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-chart-3 rounded-sm" />
                            <span>Up</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-chart-4 rounded-sm" />
                            <span>Slow</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-destructive rounded-sm" />
                            <span>Down</span>
                          </div>
                        </div>
                      </div>
                      {render24hCalendar(check.serviceName)}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Status History */}
        {history && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Recent History</h2>
            
            <Card className="p-6">
              <div className="space-y-3">
                {history.slice(0, 20).map((check, index) => (
                  <div
                    key={check.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    data-testid={`history-item-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(check.status)}`} />
                      <span className="text-sm font-medium">{check.serviceName}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{getStatusText(check.status)}</span>
                      {check.responseTime && <span>{check.responseTime}ms</span>}
                      <span>{new Date(check.checkedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
